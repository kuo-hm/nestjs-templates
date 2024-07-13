import * as fs from "fs";
const CURR_DIR = process.cwd();

const createDirectoryContents = (templatePath, newProjectPath) => {
  const filesToCreate = fs.readdirSync(templatePath);

  filesToCreate.forEach((file) => {
    const origFilePath = `${templatePath}/${file}`;
    const stats = fs.statSync(origFilePath);

    if (stats.isFile()) {
      let contents = fs.readFileSync(origFilePath, "utf8");

      if (file === ".npmignore") file = ".gitignore";

      if (file === "package.json") {
        const projectName = newProjectPath.split("-").join(" ");
        const projectNameUpperFirst =
          projectName.charAt(0).toUpperCase() + projectName.slice(1);

        contents = contents.replace(/project_name/g, projectNameUpperFirst);
      }

      if (file === "README.md") {
        const projectName = newProjectPath.split("-").join(" ");
        const projectNameUpperFirst =
          projectName.charAt(0).toUpperCase() + projectName.slice(1);

        contents = contents.replace(/project_name/g, projectNameUpperFirst);
      }

      if (file === "main.ts") {
        const project = newProjectPath.replace("/src", "");
        const projectName = project.split("-").join(" ");

        const projectNameUpperFirst =
          projectName.charAt(0).toUpperCase() + projectName.slice(1);
        contents = contents.replace(/project_name/g, projectNameUpperFirst);
      }

      const writePath = `${CURR_DIR}/${newProjectPath}/${file}`;
      fs.writeFileSync(writePath, contents, "utf8");
    } else if (stats.isDirectory()) {
      fs.mkdirSync(`${CURR_DIR}/${newProjectPath}/${file}`);

      // recursive call
      createDirectoryContents(
        `${templatePath}/${file}`,
        `${newProjectPath}/${file}`
      );
    }
  });
};

export default createDirectoryContents;
