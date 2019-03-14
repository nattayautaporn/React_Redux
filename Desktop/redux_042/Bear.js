let express = require('express');
let bodyParser = require('body-parser');
let router = express.Router();
let cors = require('cors');
let app = express();
app.use(cors());

// all of our routes will be prefixed with /api
app.use('/api', bodyParser.json(), router);   //[use json]
app.use('/api', bodyParser.urlencoded({ extended: false }), router);

let bears = [
   {'id':5935512042, 'name':'Nattaya','surname': 'Utaporn','Major':'CoE','GPA': 3.04}
];
let bearIndex=2;

router.route('/bears')
.get((req, res) =>  res.json(bears) )

.post( (req, res)=> {
    var lastid =  bears[bears.length-1].id+1  //กรณีให้เลขไอดีขึ้นอัตโนมัติ ตัวbears[b.l-1]คือถ้ามีอาร์เรย์10ตัว เราเอาค่าไอดีก่อนหน้าคือ(อาร์เรย์นับเป็น0-9) เราเอาอาร์เรย์ 9 มาทำการเปลี่ยนค่า
    var bear = {};
    bear.id = lastid  
    bear.name = req.body.name
    bear.surname = req.body.surname
    bear.Major = req.body.Major
    bear.GPA = req.body.GPA
    bears.push(bear);
    res.json( {message: 'Bear created!'} )
})


router.route('/bears/:bear_id')
   .get ( (req,res) => res.json(bears[req.params.bear_id]))  // get a bear

   .put ( (req,res) => {                               // Update a bear
       var id = req.params.bear_id
       bears[id].name = req.body.name;
       bears[id].surname = req.body.surname;   
       bears[id].Major = req.body.Major;
       bears[id].GPA = req.body.GPA;   
       res.json({ message: 'Bear updated!' + req.params.bear_id});
   })

   .delete ( (req,res) => {                   // Delete a bear
       delete     bears[req.params.bear_id]
       res.json({ message: 'Bear deleted: ' + req.params.bear_id});
   })




app.use("*", (req,res) => res.status(404).send('404 Not found') );
app.listen(80,  () => console.log("Server is running") );