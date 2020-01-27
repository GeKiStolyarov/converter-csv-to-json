const fs = require("fs");
const CSVToJSON = require("csvtojson");

const pathJSON = __dirname + "/json/";

const allFiles = fs.readdirSync(`${__dirname}/csv`);
const files = allFiles.filter(name => name !== '.gitkeep')

files.forEach(file => {
  CSVToJSON()
    .fromFile(`${__dirname}/csv/${file}`)
    .then(source => {
      const updatedSource = source.map(item => {
        return {
          p: Number(item["Стоимость"]),
          d: new Date(
            item["Дата"].replace(/(\d{2}).(\d{2}).(\d{4})/, "$3-$2-$1")
          ).getTime()
        };
      });
      fs.writeFileSync(
        `${pathJSON + file.split(".")[0]}.json`,
        JSON.stringify(updatedSource)
      );
    });
});