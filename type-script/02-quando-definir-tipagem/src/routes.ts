/**
 * Exemplo de função com tipagem typeScript
 * 
 */


import { Request, Response } from 'express'

export function helloWorld(request: Request, response: Response){
    return response.json({message: 'Hello World!'})
}

