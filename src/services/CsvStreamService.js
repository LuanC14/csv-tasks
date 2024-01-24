import fs from 'fs'
import csv from 'csv-parser'
import { Transform, Writable } from 'stream'

export class CsvStreamService {

    #readableStream = fs.createReadStream('file.csv')
    #transformStreamToObject = csv({ separator: ',' })

    #transformStreamToString = new Transform({
        objectMode: true,
        transform(chunk, encoding, callback) {
            callback(null, JSON.stringify(chunk))
        }
    })

    #writableStream = new Writable({
        write(chunk, encoding, callback) {
            const string = chunk.toString()
            const data = JSON.parse(string)
            // console.log(data)
            callback()
        }
    })

    execute() {
          this.#readableStream
            .pipe(this.#transformStreamToObject)
            .pipe(this.#transformStreamToString)
            .pipe(this.#writableStream)
            .on('close', () => console.log("Finished", new Date().toLocaleString()))
    }

}
