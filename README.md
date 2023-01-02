# beerApiJs

* Projeto baseado e feito no decorrer do curso: https://www.udemy.com/course/nodejs-express-mongodb-bootcamp/
* repo do curso : https://github.com/jonasschmedtmann/complete-node-bootcamp

A idéia era seguir as aulas do curso e não fazer um projeto totalmente igual ao apresentado, por isso a estrutura da aplicação feita por mim segue a mesma da aplicação do curso


##### Adicionei docker nesse projeto para facilitar na hora de suibir e testar a aplicação. O Dockerfile faz o build de uma image com todo o código da api e o docker-compose.yml usa a imagem da api junto com uma imagem do mongodb para subir a "infra" necessaria. 

* Para "buildar" a imagem e subir os containers ``` docker-compose up -d ```

* Se quiser ver os logs dos containers depois de up ``` docker-compose logs ```

* Depois de usar é só matar os containers com ``` docker-compose down ```
