#!/usr/bin/env node
const fs = require('fs'),
      request = require('request'),
      uritemplate  = require('uri-template'),
      path = require('path');

const repoInfo = {
    org: 'mozilla-magnet',
    repo: 'journey',
};

const userAgent = "mozmagnet Release-Agent";

/* eslint "no-warning-comments": [1, { "terms": ["todo", "fixme"] }] */
/* eslint-disable no-undef */
const githubAuthToken = process.env.GITHUB_AUTH_TOKEN; //ToDo Define process
/* eslint-enable no-undef */

const rootUrl = getRepoUrl();

function getRepoUrl() {
    return `https://api.github.com/repos/${repoInfo.org}/${repoInfo.repo}`;
}

function getNewReleaseUrl() {
    return `${rootUrl}/releases`
}

function getReleaseInfoUrl(tag) {
    return `${rootUrl}/releases/tags/${tag}`;
}

function getUploadReleaseAssetUrl(release, binaryName) {
    const template = uritemplate.parse(release.uploadUrl);
    return template.expand({ name: binaryName, label: binaryName});
}

function getReleaseInfo() {
    const artifact = process.env.ARTIFACT; // eslint-disable-line no-undef
    if (!artifact) {
        throw new Error("No ARTIFACT environment variable");
    }

    const tag = process.env.TAG; // eslint-disable-line no-undef
    if (!tag) {
        throw new Error("No TAG environment variable");
    }
    return {
        binaryName: path.basename(artifact),
        path: artifact,
        tag: process.env.TAG // eslint-disable-line no-undef
    };
}

function uploadBinary() {
  const releaseInfo = getReleaseInfo();

  if(!fs.existsSync(releaseInfo.path)) {
    throw new Error('Error reading file.');
  }

  tryGetReleaseForTag(releaseInfo.tag).then((release) => {
    if (!release) {
        return createRelease({
              tag: releaseInfo.tag,
              name: releaseInfo.tag,
              isPreRelease: true,
        });
    }

    return release;
  }).then((release) => {
      return uploadFileToRelease(release, releaseInfo.binaryName, releaseInfo.path);
  }).catch((e) => {
      // Break error out of Promise chain and throw on main event loop.
      setTimeout(function() {
          throw e;
      }, 0);
  });
}

function uploadFileToRelease(release, artifactName, artifactPath) {
    return new Promise(function(resolve, reject) {
        console.log('Uploading file to release...');

        var contentType = 'application/octet-stream';
        if (artifactName.endsWith('.apk')) {
            contentType = 'application/vnd.android.package-archive';
        }

        const fileSize = new Promise((resolve, reject) => {
            fs.stat(artifactPath, (err, stats) => {
                if (err) {
                    return reject(err);
                }

                return resolve(stats.size);
            });
        });

        fileSize.then((size) => {
            fs.createReadStream(artifactPath)
            .pipe(
                request.post({
                  url: getUploadReleaseAssetUrl(release, artifactName),
                  headers: {
                    'Authorization': `Token ${githubAuthToken}`,
                    'User-Agent': userAgent,
                    'Content-Type': contentType,
                    'Content-Length': size
                  }
                }, function(err, res, body) {
                    if (err) {
                        return reject(err);
                    }

                    if (res.statusCode < 200 || res.statusCode > 299) {
                        return reject(body);
                    }

                    const response = JSON.parse(body);
                    console.log(response);

                    console.log('Binary uploaded successfully.');
                    console.log('  - ', response.browser_download_url);
                    return resolve();
                })
            );
        });
    });
}

function createRelease(options) {
    return new Promise(function(resolve, reject) {
        console.log("Creating a new release for tag: ", options.tag);
        request.post({
            url: getNewReleaseUrl(),
            headers: {
                'Authorization': `Token ${githubAuthToken}`,
                'User-Agent': userAgent
            },
            json: {
                tag_name: options.tag,
                name: options.name,
                prerelease: options.isPreRelease,
            }
        }, function(err, res, body) {
            if (err) {
                return reject(err);
            }

            console.log(body);

            if (res.statusCode < 200 || res.statusCode > 299) {
                return reject(body);
            }

            console.log("Created release id: ", body.id);
            return resolve({ id: body.id, uploadUrl: body.upload_url });
        });
    });
}

function tryGetReleaseForTag(tag) {
    return new Promise(function(resolve, reject) {
        console.log("Looking for release for tag: ", tag);
        request.get({
            url: getReleaseInfoUrl(tag),
            headers: {
                'User-Agent': userAgent,
            }
        }, function(err, res, body) {
            if (err) {
                return reject(err);
            }

            if (res.statusCode !== 200) {
                console.log("Release for tag '", tag, "' not found");
                return resolve(false);
            }

            const parsedBody = JSON.parse(body);

            return resolve({ id: parsedBody.id, uploadUrl: parsedBody.upload_url });
        });

    });
}

uploadBinary();
