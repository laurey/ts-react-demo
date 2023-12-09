/**
 * @file config/paths
 */

const fs = require('fs');
const path = require('path');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const buildPath = process.env.BUILD_PATH || 'dist';

const moduleFileExtensions = ['js', 'jsx', 'ts', 'tsx', 'json'];

const resolveModule = (resolveFn, filePath) => {
    const extension = moduleFileExtensions.find(extension => fs.existsSync(resolveFn(`${filePath}.${extension}`)));

    if (extension) {
        return resolveFn(`${filePath}.${extension}`);
    }

    return resolveFn(`${filePath}.js`);
};

module.exports = {
    moduleFileExtensions,
    dotenv: resolveApp('.env'),
    appPath: resolveApp('.'),
    appBuild: resolveApp(buildPath),
    appPublic: resolveApp('public'),
    appHtml: resolveApp('public/index.html'),
    appIndexJs: resolveModule(resolveApp, 'src/index'),
    appPackageJson: resolveApp('package.json'),
    appSrc: resolveApp('src'),
    appTsConfig: resolveApp('tsconfig.json'),
    appJsConfig: resolveApp('jsconfig.json'),
    yarnLockFile: resolveApp('yarn.lock'),
    testsSetup: resolveModule(resolveApp, 'src/setupTests'),
    appNodeModules: resolveApp('node_modules'),
    excludeModules: [/node_modules/],
    publicUrlOrPath: '/',
    jsBundleLocation: 'assets/js',
    cssBundleLocation: 'assets/css',
    fontBundleLocation: 'assets/font',
    imageBundleLocation: 'assets/static'
};
