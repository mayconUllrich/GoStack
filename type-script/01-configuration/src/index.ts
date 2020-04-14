/** 
 * Como configurar o TS
 * ====================
 * 
 * 1 - para criar o arquivo de configuração do TS usa o comando: yarn tsc --inity
 * 
 * 2 - um configuração dentro do arquivo tsconfig.json presisa ser feita para 
 * separar os arquivos ts do js:      "outDir": "./dist",  
 * 
 * 3 -  para converter ts em js usa o comando:yarn tsc src/index.ts
 */

import express from 'express'

const app = express()

app.get('/', (request, response)=>{
    return response.json({message:'Hello World'})
})

app.listen(3333)