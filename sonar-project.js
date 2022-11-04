// const scanner = require('sonarqube-scanner');
// scanner(
//     {
//         serverUrl: "http://localhost:9000",
//         login:"admin",
//         password:"admin",
//         options: {
//             'sonar.login': 'admin',
//             'sonar.password': 'sonar',
//             "sonar.sources": "./src"
//         },
//     },
//     () => process.exit()
// );
const sonarqubeScanner = require("sonarqube-scanner");
sonarqubeScanner(
  {
    serverUrl: "http://localhost:9000",
    options: {
      "sonar.login": "admin",
      "sonar.password": "sonar",
      "sonar.projectName": "srfgroup_front",
      "sonar.projectDescription":
        'Description for "srfGroup Project" project...',
      "sonar.sources": "./src",
      // "sonar.tests": "./src",
      // "sonar.typescript.lcov.reportPaths": "coverage/lcov.info",
      // "sonar.testExecutionReportPaths": "test-report.xml"
    },
  },
  () => {}
);
