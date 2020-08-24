const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
//to get directory path => console.log(__dirname); to get file path  => console.log(__filename);
const app = express()

//use to define path for express config
const directoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialspath = path.join(__dirname,'../templates/partials')

//setup handlebars location
app.set('view engine','hbs')
app.set('views',viewsPath)
//to use partials we use register
hbs.registerPartials(partialspath)

//use when static files is to be rendered on to the page
app.use(express.static(directoryPath))

// app.get('',(req,res)=>{
//     res.send('hi welcome to the page')
// })
app.get('',(req,res)=>{
    //render is used with handlebars
    res.render('index',{
        name:'Devarsh',
        title:'Weather App'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        name:'Devarsh',
        title:'About'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        name:'Devarsh',
        title:'Help'
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"Address can't be empty"
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({error});
            }
            res.send({
                address:req.query.address,
                location,
                forecastData
            }) 
        })
            
    })
    
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        msg:'Requested help page is not found',
        name:'Devarsh'
    })
})
app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        msg:'Page not found',
        name:'Devarsh'
    })
})

app.listen(3000,()=>{
    console.log("Port is started")
})
