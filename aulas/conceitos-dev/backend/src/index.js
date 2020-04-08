const express = require('express')
const app = express()

/** Biblioteca: uuidv4 
 * para instalar: yarn add uuidv4
 * 
 * Método: uuid = Cria um ID universal unico.
 * Método isUuid = Valida o uuid
 * 
 */
const { uuid, isUuid } = require('uuidv4')


app.use(express.json())

/**
 * Métodos HTTP
 * 
 * GET: Buscar informações do back-end
 * POST: Criar uma informação no back-end
 * PUT: Alterar informações no back-end
 * PATCH: Alterar uma informação no back-end
 * DELETE: Deletar uma informação no back-end
 */

/**
 * Tipos de Paramentros
 * 
 * Query Params: Filtros e Paginação ?title=React&owner=Maycon
 * Route Params: Identificar recursos (Atualizar / Deletar)
 * Request Body: Conteúdo na hora de criar ou editar um recurso (JSON)
 */

 /**
  *                            👉 Middleware 👈
  * 
  * Interceptador de requisições que pode interromper totalmente a requisição ou 
  *   alterar dados da requisição.
  * 
  * middleware conseque pegar todos os tipos parametros que passam pelas rotas.
  * Query, Params, Boby
  * 
  * É usado para disparar trechos de código em qualquer rota da aplicação. 
  * como se fosse um "gatilho"
  *
  * Pode ser usado para todas as rotas chamando a função antes delas
  * app.use(logRequests)
  *
  * Pode ser usado somente um uma rota, sendo chamado dentro da rota
  * app.get('/projects', logRequests, (request, response) => {
  *
  * Pode ser usado varios middleares em uma rota
  * app.get('/projects', logRequests1, logRequestsN,(request, response) => {
  *
  * Pode ser usado em varias rotas usando a url da rota
  * app.use('/projects/:id', validatePojectId)
  */  
    
  function logRequests(request, response, next) {
      
    // Pega o Metodo e a Rota(url) de toda a aplicação
    const { method, url } = request

    // Recebe o metodo em caixa alta e a url.
    const logLabel = `Método: [${method.toUpperCase()}],  URL:${url}, Time`
    
    console.time(logLabel)

    // Chama o proximo middleware
    next()
    
    console.timeEnd(logLabel)
    
  }

  function validatePojectId(request, response, next) {

    const { id } = request.params

    if (!isUuid(id)) {
      return response.status(400).json({error: 'Invalid project ID.'})
    }

    return next()

  }

  // O aplicativo passa a "usar" a função logRequests
  app.use(logRequests)
  app.use('/projects/:id', validatePojectId)

  // Constante usada para armazenar os dados
  const projects = []


// 🇬 🇪 🇹 👉 Usando Query params.
app.get('/projects', (request, response) => {
  
  // 🏄 Exibindo o conteudo da query
  console.log(`O projeto ${request.query.title} foi desenvolvido pelo dev: ${request.query.owner}`)
  
  // 🏄 Conteudo da query sendo desestruturado
  const { title, owner } = request.query
  console.log(`O projeto ${title} foi desenvolvido pelo dev: ${owner}`)

  // O filtro é feito usando um operador ternario
  const reuslts = title

    // Se o titulo foi preenchido, faça a filtragem
    ? projects.filter(project => project.title.includes(title))
      // Onde: 
      // - filter(metodo da Array para filtrar) Faz um laço na Array
      // - includes(metodo que retorna true or false) true add projetct à projects

    // Senão, mostre todos os projetos
    : projects

  // 📢 Resposta  
  return response.json(reuslts)
})

// 🇵 🇴 🇸 🇹 👉 Usando request body.
app.post('/projects', (request, response) => {
  
  // 🏄 Constante recebendo conteudo do body
  const data = request.body
  console.log(`O projeto ${data.title} foi desenvolvido pelo dev ${data.owner}`)
  
  // 🏄 Conteudo do body sendo desestruturado
  const { title, owner } = request.body
  console.log(`O projeto ${title} foi desenvolvido pelo dev ${owner}`)
  
  
  const project = { id: uuid(), title, owner }
  projects.push(project)
  
  // 📢 Resposta  
  return response.json(project)
})



// 🇵 🇺 🇹 👉 Usando Route Params ➕ Request Body
app.put('/projects/:id', (request, response) => {
  
  // 🏄 Route Params

    // 🌝 Exibindo o conteudo do params
    const params = request.params
    console.log(`O parametro retornado foi: ${params.id}`)
    
    // 🌝 Conteudo do Route Params sendo desestruturado
    const { id } = request.params
    console.log(`Agora na desestruturação ${id}`)
    
  // 🏄 Request Body
    
    // 🌝 Exibindo o conteudo do body
    const data = request.body
    console.log(`O projeto ${data.title} foi desenvolvido pelo dev ${data.owner}`)
    
    // 🌝 Conteudo do body sendo desestruturado
    const { title, owner } = request.body
    console.log(`O projeto ${title} foi desenvolvido pelo dev ${owner}`)


    const projectIndex = projects.findIndex(project => project.id === id)

    if (projectIndex < 0) {
      return response.status(400).json({error: 'Project not found.'})
    }
    
    const projetc = {
      id,
      title,
      owner,
    }
    
    projects[projectIndex] = projetc
    
    // 📢 Resposta    
    return response.json(projetc)
  })
  
  // 🇩 🇪 🇱 🇪 🇹 🇪 👉 Usando Route params.
  app.delete('/projects/:id', (request, response) => {
    
    
    // 🏄 Exibindo o conteudo do params
    const params = request.params
    console.log(`O parametro retornado foi: ${params.id}`)
    
    // 🏄 Conteudo do Route Params sendo desestruturado
    const { id } = request.params
    console.log(`Agora na desestruturação ${id}`)
    
    const projectIndex = projects.findIndex(project => project.id === id)
  
    if (projectIndex < 0) {
      return response.status(400).json({error: 'Project not found.'})
    }

    projects.splice(projectIndex, 1)

    // 📢 Resposta
    return response.status(204).send()
})


app.listen(3333, () => {
  console.log('🚀  Back-end started!')
})