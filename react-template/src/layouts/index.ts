const layoutModulesFiles = require.context('./', true, /Layout\.tsx$/);

const layoutModules = layoutModulesFiles.keys().reduce((modules: any, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/(.*\/)*([^.]+).*/gi, '$2');
  const value = layoutModulesFiles(modulePath);
  modules[moduleName] = value.default;
  return modules;
}, {});

export default layoutModules;
