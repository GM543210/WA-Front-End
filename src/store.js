export default {
    authenticated: false,
    currentUser: null,
    userType: '',
    //za testiranje
    fullname:'',
    email:'',
    password:'',
    UID:'',
    institution_name:'',
    branch_office_city:'',
    institution_adress:'',
    institution_wh:'',
    i:0,
    selectedInstitution:{
        Caption: "",
        Adress:"",
        WorkingHours:"",
        City:""
    },
    selectedWindow:{
        Caption: "",
        ID:""
    },
    PQ:{
        ID:"",
        PlaceInQ:""
    },
    Queue:{
        WindowID:'',
        PeopleInQ:33,
        BeingServed:'#173',
        NextInQ:'#174',

    }

}