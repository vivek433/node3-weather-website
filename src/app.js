const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')
const app=express()
const port=process.env.PORT || 3000
//Define path for express config
const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')
//Set up handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
//Setup static directory to serve
app.use(express.static(publicDirectoryPath))



 app.get('',(req,res)=>
 {
    res.render('index',
    {
        title:'Weather',
        name:'Vivek kumar Pandey'
    })
 })
 app.get('/about',(req,res)=>
 {
    res.render('about',
    {
        title:'About Me',
        name:'Vivek kumar Pandey'
    })
 })
 app.get('/help',(req,res)=>
 {
    res.render('help',
    {
        title:'HELP',
        name:'Vivek kumar Pandey',
        message:'For any help kindly contact me at my email'
    })
 })
app.get('/weather',(req,res)=>
{
    if(!req.query.address)
    {
        return res.send({
            error:'Input Address'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>
    {   if(error)
        {
            return res.send({error})
        }
        forecast(latitude,longitude,(error,forecastData)=>
    {if(error)
        {
            return res.send({error})
        }
       res.send({location, forecastData})
       
    })
    
    })

})
app.get('/help/*',(req,res)=>
{
 res.render('404',{title:404,
     errorMessage:'Help article not found',
     name:'Vivek kumar Pandey'
    })
})
app.get('*',(req,res)=>
{
    res.render('404',{
        title:'404',
        errorMessage:'Page not found',name:'Vivek kumar Pandey'
       })
})

app.listen(port,()=>
{
    console.log("server is up on "+ port)
})