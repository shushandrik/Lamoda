const axios = require ('axios');
const validator = require('jsonschema');
const categorySchema = require('../data/category.v1.schema.json');


describe ('API tests Lamoda', function () {
    let response;
    beforeAll(async() =>{
        response = await axios.get('https://www.lamoda.by/goapi/seo/?url=%2Fc%2F2981%2Fshoes-krossovk-kedy-muzhskie%2F', {
        headers:{
        "Content-Type":`application/json; charset=utf-8`}
            })

    })
    test ('status code should be 200', async () => {        
    expect (response.status).toEqual(200)
    })

    test ('status code should be 200', async () => {
        const result = validator.validate(response.data, categorySchema);
        expect (result.valid).toEqual(true)
    })


})