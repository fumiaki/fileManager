import fs from "fs"
import path from "path"
import csv from "csv"
import stringify from 'csv-stringify-as-promised'

const ROOT_PATH = path.resolve("C:/dev")


export function readdir(dirPath) {
  //console.log(dirPath)
  let list = fs.readdirSync(path.join(ROOT_PATH, dirPath))
  let result = [];
  list.forEach(file => {
    let filePath = path.join(ROOT_PATH, dirPath, file)
    let stat = fs.statSync(filePath)
    stat.name = file
    stat.path = dirPath
    stat.absolutePath = filePath
    stat.isDirectory = stat.isDirectory()
    result.push(stat)
    //console.log(file, stat.size, stat.path, stat.isDirectory())
  })

  return result
}

export async function readdirCsv(dirPath) {
  let json = readdir(dirPath)
  let csvStr = await stringify(json)

  console.log(csvStr)
  return csvStr
}
