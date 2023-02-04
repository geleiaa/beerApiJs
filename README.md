# beerApiJs

* Projeto baseado e feito no decorrer do curso: https://www.udemy.com/course/nodejs-express-mongodb-bootcamp/
* repo do curso : https://github.com/jonasschmedtmann/complete-node-bootcamp

A idéia era seguir as aulas do curso e não fazer um projeto totalmente igual ao apresentado, por isso a estrutura da aplicação feita por mim segue a mesma da aplicação do curso


> ### Api Docs com Swagger
> se quiser ver a documentação com mais detalhes, importe o arquivo swagger.json para a ferramenta online do Swagger https://editor.swagger.io/

![apidocs](https://github.com/geleiaa/beerApiJs/blob/main/prints/apidoc.png)
> _____________________________________________________________________________________


### GET com Filtros:  
* ##### filtro com um campo(field) do document, pode ser "nome", "tipo", "preço", etc. Também pode ser usado dois campos na mesma query dividindo os campos com um "&", dessa forma "?nome=nome&tipo=tipo"
> /api/v1/beer?field=value  ou  /api/v1/beer?field=value&field=value

* ##### filtro de paginação. A query de paginação tem duas partes: um parâmetro "page" e um parâmetro "limit" que especifica o número de documents por página. 
> /api/v1/beer?page=2&limit=10

(os filtros foram implementados no arquivo /utils/apiFeautres.js)
> _____________________________________________________________________________________


> ### Docker: 
##### Adicionei docker para facilitar na hora de subir e testar a aplicação e também pra praticar as skills docker. O ***Dockerfile*** "builda" uma imagem com todo o código da api e o ***docker-compose.yml*** usa a imagem da api junto com uma imagem do MongoDB para subir os containers necessarios.

* Para "buildar" a imagem e subir os containers ``` docker-compose up -d ```

* Se quiser ver os logs dos containers depois de up ``` docker-compose logs ```

* Depois de usar é só matar os containers com ``` docker-compose down ```
> _____________________________________________________________________________________


> WORKFLOW:        

**REQUEST --> app.js --> Routes --> Controllers --> RESPONSE ...**

> ERROR WORKFLOW:    

**REQUEST --> App.JS --> errorControll.js --> RESPONSE ...**

