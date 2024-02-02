const bcriyptjs = require('bcryptjs')
const AdminModel = require('../model/admin')
const PostModel = require('../model/post')
const AboutModel = require('../model/about')
const ContactModel = require('../model/contact')
const UserModel = require('../model/user')
const jwt = require('jsonwebtoken')
const adminAuth = require('../middleware/adminAuth')

exports.adLogin = (req, res) => {
    res.render('login', { title: "Admin login" })
}


exports.logCreate = (req, res) => {
    AdminModel.findOne({ email: req.body.email }).then((data) => {
        if (data) {
            if (data.admin == true) {
                const pass = data.password;
                if (bcriyptjs.compareSync(req.body.password, pass)) {
                    const token = jwt.sign({
                        id: data._id,
                        name: data.name,
                        email: data.email
                    }, "BIVAS5555", { expiresIn: "1h" });
                    console.log(token);
                    console.log(data.name);
                    res.cookie('adminToken', token)
                    res.cookie('email', data.email)
                    res.cookie('password', data.password)
                    res.redirect('/post')
                }
                else {
                    // req.flash('massage', "password not match")
                    console.log("password not match");
                    res.redirect('/')
                }
            }
            else {
                // req.flash('massage', "email not available")
                console.log('email not available');
                res.redirect('/')
            }
        }
    }).catch((err) => {
        console.log(err);
    })
}



exports.adRegister = (req, res) => {
    res.render('register', { title: "Admin Register" })
}

exports.adminCreate = (req, res) => {
    const admin = new AdminModel({
        name: req.body.name,
        email: req.body.email,
        password: bcriyptjs.hashSync(req.body.password, bcriyptjs.genSaltSync(10)),
        status: false,
    })
    admin.save().then((data) => {
        if (data) {
            console.log('Admin Add Successfully');
            res.redirect('/')
        }
    }).catch((err) => {
        console.log(err, 'Admin Not Added');
    })
}





exports.dashbord = (req, res) => {
    res.render('dashboard', { title: "Admin Dashbord",asminData: req.admin })
}


exports.postCreate = (req, res) => {
    const Acreate = new PostModel({
        title: req.body.title,
        content: req.body.content,
        username: req.body.username
    });
    Acreate.save().then((result) => {
        console.log('post Add Successfully');
        res.redirect('/post')
    }).catch((err) => {
        console.log(err, 'Post not Added');
        res.redirect('/post')
    })
}

exports.about = (req, res) => {
    res.render('about', {
        title: "Admin About Page",
        asminData: req.admin
    })

}



exports.aboutCreate = (req, res) => {
    const Acreate = new AboutModel({
        title: req.body.title,
        contant: req.body.contant,
        name: req.body.name
    });
    Acreate.save().then((data) => {
        if (data) {
            console.log('About Add Successfully');
            res.redirect('/about')
        }
    }).catch((err) => {
        console.log(err, 'About not Added');
        res.redirect('/about')
    })
}



exports.adminAuth = (req, res, next) => {
    if (req.admin) {
        console.log(req.admin);
        next()
    } else {
        console.log('error while Auth');
        res.redirect('/')
    }
}

exports.user = (req, res) => {
    UserModel.find()
    .then(userv=>{
        console.log(userv);
        res.render('viewuser', {userv, title: "Admin User Page",asminData: req.admin })
    
    })
    .catch(error=>{
        res.render('viewuser',{error: `Eroor to fatching data ${userv}`})
    })
}

exports.contact = (req,res) =>{
    ContactModel.find()
    .then(contp=>{
        console.log(contp);
        res.render('contac', {contp, title: "Admin Contact Page",asminData: req.admin })
    })
    .catch(error=>{
        res.render('contac',{error: `Eroor to fatching data ${contp}`})
    })
}

exports.delete = ((req, res) => {
    const cid = req.params.id;
    ContactModel.deleteOne({ _id: cid }).then(del => {
        console.log(del, "delete successfully");
        res.redirect('/post');
    }).catch(err => {
        console.log(err);
    })

})

exports.userDelete = ((req, res) => {
    const uid = req.params.id;
    UserModel.deleteOne({ _id: uid }).then(del => {
        console.log(del, "delete successfully");
        res.redirect('/post');
    }).catch(err => {
        console.log(err);
    })

})

exports.Logout = (req, res) => {
    res.clearCookie("adminToken")
    res.redirect('/')
}