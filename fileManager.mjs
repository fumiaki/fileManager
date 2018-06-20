import fs from "fs"
import path from "path"
import csv from "csv"
//import stringify from 'csv-stringify-as-promised'
import stringify from 'csv-stringify/lib/sync'

const ROOT_PATH = path.resolve("C:/dev")

export function readdir(dirPath, recursive=false) {
  //console.log(dirPath)
  let list = fs.readdirSync(path.join(ROOT_PATH, dirPath))
  let result = [];
  list.forEach(file => {
    let absolutePath = path.join(ROOT_PATH, dirPath, file)
    let stat = fs.statSync(absolutePath)
    stat.name = file
    stat.path = path.posix.join(dirPath)
    stat.absolutePath = absolutePath
    stat.isDirectory = stat.isDirectory()
    result.push(stat)

    if(recursive && stat.isDirectory) {
      result.push(...readdir(path.join(dirPath, file), true))
    }
    //console.log(file, stat.size, stat.path, stat.isDirectory())
  })

  return result
}

const DATEFORMATTER = {
  date: value => value.toLocaleString()
}
export async function readdirCsv(dirPath) {
  let json = readdir(dirPath, true)
  let csvStr = await stringify(json, {header:true, formatters:DATEFORMATTER})

  return csvStr
}
