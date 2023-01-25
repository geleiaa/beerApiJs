# beerApiJs

* Projeto baseado e feito no decorrer do curso: https://www.udemy.com/course/nodejs-express-mongodb-bootcamp/
* repo do curso : https://github.com/jonasschmedtmann/complete-node-bootcamp

A idéia era seguir as aulas do curso e não fazer um projeto totalmente igual ao apresentado, por isso a estrutura da aplicação feita por mim segue a mesma da aplicação do curso

##### Api Docs com Swagger

![apidocs](https://github.com/geleiaa/beerApiJs/blob/main/prints/apidoc.png)

##### GET com filtros [/api/v1/beer/]

##### Adicionei docker para facilitar na hora de subir e testar a aplicação e também pra praticar as skills docker. O ***Dockerfile*** "builda" uma imagem com todo o código da api e o ***docker-compose.yml*** usa a imagem da api junto com uma imagem do MongoDB para subir os containers necessarios.

* Para "buildar" a imagem e subir os containers ``` docker-compose up -d ```

* Se quiser ver os logs dos containers depois de up ``` docker-compose logs ```

* Depois de usar é só matar os containers com ``` docker-compose down ```
