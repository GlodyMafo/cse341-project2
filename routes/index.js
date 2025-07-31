const router = require ('express').Router();

router.use('/',require('./swagger'))

router.get('/',(req , res)=>{

    // swaggerAutogen.tags=['hello word']
    
    res.send("Hello Word")
})

router.use('/events', require('./events'));
router.use('/users', require('./users'));

module.exports=router;