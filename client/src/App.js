import './App.css';
import * as React from 'react';
import { useState,useEffect } from 'react';
import Axios from 'axios';
import LoadingScreen from './loadingScreen/index';
import img1 from "./store/face1.jpg";
import img2 from "./store/face2.jpg";
import img3 from "./store/face3.jpg";
import img4 from "./store/face4.jpg";
import edit from './store/edit.svg';
import back from './store/back.svg';

const App = () => {

  const[roll,setRoll]=useState(-99999)
  const[name,setName]=useState("")
  const[address,setAddress]=useState("")

  const[social,setSocial]=useState(-99999)
  const[english,setEnglish]=useState(-99999)
  const[physics,setPhysics]=useState(-99999)
  const[chemistry,setChemistry]=useState(-99999)
  const[math,setMath]=useState(-99999)


  const[uroll,setuRoll]=useState(-99999)
  const[uname,setuName]=useState("")
  const[uaddress,setuAddress]=useState("")
  const[usocial,setuSocial]=useState(-99999)
  const[uenglish,setuEnglish]=useState(-99999)
  const[uphysics,setuPhysics]=useState(-99999)
  const[uchemistry,setuChemistry]=useState(-99999)
  const[umath,setuMath]=useState(-99999)




  const[loading,setloading]=useState(true)
  const[all,setAll]=useState([])
  const[infoEach,setInfoEach]=useState([])
  const[screen,setScreen]=useState({
                                    info:"none",
                                    all:"flex",
                                    edit:"none"
  });
  


  function getter()
  {
    Axios.get('http://localhost:3001/getter-all',
    {
        
    }).then((res)=>{
      setAll(res.data)
      setloading(false);
    })

  }

  useEffect(() => {
    getter() 
  }, []);


  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }




  function submit_clicked()
  {
    if(roll===-99999)
    {
        alert("Roll No. Not filled correctly");
        return;
    }


    let flagname=/^[A-Z a-z]+$/;
    if(flagname.test(name)===false)
    {
        alert("Name Not filled correctly");
        return;
    }
    if(name.length===0 || name.length>30)
    {
        alert("Name Not filled correctly");
        return;
    }

    var check=/^[#.0-9a-zA-Z\s,-]+$/;
    if(check.test(address)===false)
    {
        alert("Fill address field properly");
        return;
    }

    var social1=parseInt(social)
    var english1=parseInt(english)
    var chemistry1=parseInt(chemistry)
    var physics1=parseInt(physics)
    var math1=parseInt(math)



    if(social1===-99999 || (social1<0 || social1>100))
    {
        alert("Social marks Not filled correctly");
        return;
    }
    if(english1===-99999 || (english1<0 || english1>100))
    {
        alert("English marks Not filled correctly");
        return;
    }
    if(chemistry1===-99999 || (chemistry1<0 || chemistry1>100))
    {
        alert("Chemistry marks Not filled correctly");
        return;
    }
    if(physics1===-99999  || (physics1<0 || physics1>100))
    {
        alert("physics marks Not filled correctly");
        return;
    }
    if(math1===-99999 || (math1<0 || math1>100))
    {
        alert("Math marks Not filled correctly");
        return;
    }

    Axios.get('http://localhost:3001/get-each',
    {
      params:{
        roll:roll,
      }
        
    }).then((res)=>{
      if(res.data==="exist")
      {
        alert("Already exist");
        return;
      }
      else
      {
        var imgVal=getRandomInt(4)
        var li=[img1,img2,img3,img4]
        var imgGo=li[imgVal];
        var avg=(social1+english1+chemistry1+physics1+math1)/5;
        var grade="F"
        if(avg>90)
        {
          grade="A";
        }
        else if(avg<=90 && avg>=80)
        {
          grade="B";
        }
        else if(avg<=79 && avg>=70)
        {
          grade="C";
        }
        else if(avg<=69 && avg>=60)
        {
          grade="D";
        }
        else if(avg<=59 && avg>=50)
        {
          grade="E";
        }
        else if(avg<=49 && avg>=33)
        {
          grade="E-";
        }
        else{
          grade="F";
        }
        var total=(social1+english1+chemistry1+physics1+math1)
        Axios.post('http://localhost:3001/post-data',
        {
          roll:parseInt(roll),
          name:name,
          address:address,
          social:social1,
          english:english1,
          chemistry:chemistry1,
          physics:physics1,
          math:math1,
          avg:avg,
          total:total,
          img:imgGo,
          grade:grade
        }).then((res)=>{
          if(res.data===true)
          {
            alert("Data updated successfully!!");
            getter();
            return;
          }
          else
          {
            alert("Failed to upload!!");
            return;
          }
        });
      }
    });



  }


  


  function getInfo(x)
  {
    console.log(x)
    Axios.get('http://localhost:3001/get-each-info',
    {
      params:{
        roll:x,
      }
    }).then((res)=>{
      if(res.data==="")
      {
        alert("not present");
      }
      else
      {
        setInfoEach(res.data)
        setScreen({info:"flex",all:"none",edit:'none'});
      }
      
    })
    
  }




  function updateJson()
  {
    var flag=0;
    if(uroll!==-99999)
    {
      Axios.get('http://localhost:3001/get-each',
      {
        params:{
          roll:uroll,
        }
          
      }).then((res)=>{
        if(res.data==="exist")
        {
          alert("Already exist");
          return;
        }
      })
    }
    if(uname==="")
    {
      setuName(infoEach.name);
    }
    if(uaddress==="")
    {
      setuAddress(infoEach.address)
    }
    if(usocial===-99999)
    {
      setuSocial(infoEach.social)
    }
    if(uphysics===-99999)
    {
      setuPhysics(infoEach.physics)
    }
    if(uchemistry===-99999)
    {
      setuChemistry(infoEach.chemistry)
    }
    if(uenglish===-99999)
    {
      setuEnglish(infoEach.english)
    }
    if(umath===-99999)
    {
      setuMath(infoEach.math)
    }
    var social2=parseInt(usocial)
    var english2=parseInt(uenglish)
    var chemistry2=parseInt(uchemistry)
    var physics2=parseInt(uphysics)
    var math2=parseInt(umath)


    var avg2=(social2+english2+chemistry2+physics2+math2)/5;
    var grade2="F"
    if(avg2>90)
    {
      grade2="A";
    }
    else if(avg2<=90 && avg2>=80)
    {
      grade2="B";
    }
    else if(avg2<=79 && avg2>=70)
    {
      grade2="C";
    }
    else if(avg2<=69 && avg2>=60)
    {
      grade2="D";
    }
    else if(avg2<=59 && avg2>=50)
    {
      grade2="E";
    }
    else if(avg2<=49 && avg2>=33)
    {
      grade2="E-";
    }
    else{
      grade2="F";
    }
    var total2=(social2+english2+chemistry2+physics2+math2)
    Axios.post('http://localhost:3001/update-each',
    {
      oldRoll:infoEach.rollno,
      roll:parseInt(uroll),
      name:uname,
      address:uaddress,
      social:social2,
      english:english2,
      chemistry:chemistry2,
      physics:physics2,
      math:math2,
      avg:avg2,
      total:total2,
      grade:grade2

    }).then((res)=>{
      if(res.data===true)
      {
        alert("Data updated successfully!!");
        getter();
        setScreen({info:"none",all:"flex",edit:'none'});
        return;
      }
      else
      {
        alert("Failed to upload!!");
        return;
      }
    });
  } 

  return (
    <div className="outer">
      
      
      <div className="inner" >
        <div className="heading">
          SCHOOL MANAGMENT
        </div>
        <div className='inner__info' style={{display:screen.info}}>
          <div className='inner__info__inner'>
            <div className='inner__info__inner__top'>
              <div className='inner__each__info'>
                <div className='inner__each__info__name'>
                  Roll No. : {infoEach.rollno}
                </div>
                <div className='inner__each__info__name' style={{fontSize:"18px"}}>
                  Name : {infoEach.name}
                </div>
              </div>
              <div className='inner__image'>
                <img src={infoEach.img} style={{width:"100%",height:"100%",borderRadius:"50%"}}/>
              </div>
            </div>

            <table>
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>SOCIAL</td>
                  <td>{infoEach.social}/100</td>
                </tr>
                <tr>
                  <td>ENGLISH</td>
                  <td>{infoEach.english}/100</td>
                </tr>
                <tr>
                  <td>PHYSICS</td>
                  <td>{infoEach.physics}/100</td>
                </tr>
                <tr>
                  <td>CHEMISTRY</td>
                  <td>{infoEach.chemistry}/100</td>
                </tr>
                <tr>
                  <td>MATH</td>
                  <td>{infoEach.math}/100</td>
                </tr>
              </tbody>
            </table>

            <div className='inner__info__inner__top' style={{marginTop:"1rem"}}>
              <div className='inner__each__info'>
                <div className='inner__each__info__name'>
                  Total : {infoEach.total}/500
                </div>
                <div className='inner__each__info__name' style={{fontSize:"18px"}}>
                  Average : {infoEach.avg}
                </div>
              </div>
              <div className='inner__image' style={{width:"fit-content",height:"fit-content"}}>
                <div className='inner__each__info__name' style={{fontSize:"20px"}}>
                  GRADE : {infoEach.grade}
                </div>
              </div>
            </div>

          </div>
          <div className='button__outer'>
            <div className='button' onClick={()=>{setScreen({info:"none",all:"flex",edit:"none"})}}>
              Close
            </div>
            <div className='button' onClick={()=>{setScreen({info:"none",all:"none",edit:"flex"})}}>
              <img src={edit} style={{width:"30px",height:"30px",color:"white"}}/>
            </div>
          </div>
        </div>


        <div className='inner__info'style={{display:screen.edit}}>
        
        <div className="body__right" >
            <div className="name-outer" style={{marginTop:"1.8rem"}}>
                <div className="name-label">
                    Roll No.{'\u00A0'}<i style={{color:"#EF4B4D",width:"10px",height:"10px"}} class="far fa-address-book"></i>
                </div>
                <input onChange={(e)=>{setuRoll(e.target.value)}}  type="number" placeholder={infoEach.rollno} className="name-field"  required='required'/>
            </div>
            <div className="name-outer" style={{marginTop:"0.5rem"}}>
                <div className="name-label">
                    Name{'\u00A0'}<i style={{color:"#EF4B4D",width:"10px",height:"10px"}} class="far fa-address-book"></i>
                </div>
                <input onChange={(e)=>{setuName(e.target.value)}} type="text" placeholder={infoEach.name} className="name-field"  required='required'/>
            </div>
            <div className="name-outer" style={{marginTop:"0.5rem"}}>
                <div className="name-label">
                    Address{'\u00A0'}<i style={{color:"#EF4B4D",width:"10px",height:"10px"}} class="far fa-address-book"></i>
                </div>
                <input onChange={(e)=>{setuAddress(e.target.value)}} type="text" placeholder={infoEach.address} className="name-field"  required='required'/>
            </div>
            <div className='name-outer-outer'>
              <div className="name-outer2" style={{marginTop:"0.5rem"}}>
                <div className="name-label">
                    Social{'\u00A0'}<i style={{color:"#EF4B4D",width:"10px",height:"10px"}} class="far fa-address-book"></i>
                </div>
                <input min="0" onChange={(e)=>{setuSocial(e.target.value)}} type="number" placeholder={infoEach.social} className="name-field"  required='required'/>
              </div>
              <div className="name-outer2" style={{marginTop:"0.5rem"}}>
                <div className="name-label">
                    English{'\u00A0'}<i style={{color:"#EF4B4D",width:"10px",height:"10px"}} class="far fa-address-book"></i>
                </div>
                <input min="0" onChange={(e)=>{setuEnglish(e.target.value)}} type="number" placeholder={infoEach.english} className="name-field"  required='required'/>
              </div>
            </div>
            <div className='name-outer-outer'>
              <div className="name-outer2" style={{marginTop:"0.5rem"}}>
                <div className="name-label">
                    Chemistry{'\u00A0'}<i style={{color:"#EF4B4D",width:"10px",height:"10px"}} class="far fa-address-book"></i>
                </div>
                <input min="0" onChange={(e)=>{setuChemistry(e.target.value)}} type="number" placeholder={infoEach.chemistry} className="name-field"  required='required'/>
              </div>
              <div className="name-outer2" style={{marginTop:"0.5rem"}}>
                <div className="name-label">
                    Physics{'\u00A0'}<i style={{color:"#EF4B4D",width:"10px",height:"10px"}} class="far fa-address-book"></i>
                </div>
                <input min="0" onChange={(e)=>{setuPhysics(e.target.value)}} type="number" placeholder={infoEach.physics} className="name-field"  required='required'/>
              </div>
            </div>
            <div className='name-outer-outer'>
              <div className="name-outer2" style={{marginTop:"0.5rem"}}>
                <div className="name-label">
                    Maths{'\u00A0'}<i style={{color:"#EF4B4D",width:"10px",height:"10px"}} class="far fa-address-book"></i>
                </div>
                <input min="0" onChange={(e)=>{setuMath(e.target.value)}} type="number" placeholder={infoEach.math} className="name-field"  required='required'/>
              </div>
            </div>
            <div className='name-outer-outer'>
              <div className='button' onClick={()=>{updateJson()}}>
                UPDATE
              </div>
              <div className='button' onClick={()=>{setScreen({info:"flex",all:"none",edit:"none"})}}>
              <img src={back} style={{width:"19px",height:"19px",padding:"5px",color:"white"}}/>
              </div>
            </div>
          </div>
            
        </div>












        <div className="body" style={{display:screen.all}}>











          <div className="body__left">
          {
            loading ? (
              <LoadingScreen/>
            ):(
                all.map((ele)=>{
                  const{rollno,name,img,avg}=ele;
                  return (
                    <div  className="leadershipcard1__each__card" onClick={()=>{getInfo(rollno)}}>
                        <div className="leadershipcard1__each__card__image">
                            <img src={img} className="leadershipcard1__each__card__image__img"/>
                        </div>
                        <div className="leadershipcard1__each__card__name">
                            {rollno}
                        </div>
                        <div className="leadershipcard1__each__card__jobtitle">
                            {name}
                        </div>
                        <div className="leadershipcard1__each__card__name">
                            <span style={{color:"orange"}}>AVG</span>{'\u00A0'}: {avg}
                        </div>
                    </div>
                  )
                })
          )}

          </div>



















          <div className="body__right">
            <div className="name-outer" style={{marginTop:"1.8rem"}}>
                <div className="name-label">
                    Roll No.{'\u00A0'}<i style={{color:"#EF4B4D",width:"10px",height:"10px"}} class="far fa-address-book"></i>
                </div>
                <input onChange={(e)=>{setRoll(e.target.value)}} type="number" placeholder={"Roll No"} className="name-field"  required='required'/>
            </div>
            <div className="name-outer" style={{marginTop:"0.5rem"}}>
                <div className="name-label">
                    Name{'\u00A0'}<i style={{color:"#EF4B4D",width:"10px",height:"10px"}} class="far fa-address-book"></i>
                </div>
                <input onChange={(e)=>{setName(e.target.value)}} type="text" placeholder={"Name"} className="name-field"  required='required'/>
            </div>
            <div className="name-outer" style={{marginTop:"0.5rem"}}>
                <div className="name-label">
                    Address{'\u00A0'}<i style={{color:"#EF4B4D",width:"10px",height:"10px"}} class="far fa-address-book"></i>
                </div>
                <input onChange={(e)=>{setAddress(e.target.value)}} type="text" placeholder={"Address"} className="name-field"  required='required'/>
            </div>
            <div className='name-outer-outer'>
              <div className="name-outer2" style={{marginTop:"0.5rem"}}>
                <div className="name-label">
                    Social{'\u00A0'}<i style={{color:"#EF4B4D",width:"10px",height:"10px"}} class="far fa-address-book"></i>
                </div>
                <input min="0" onChange={(e)=>{setSocial(e.target.value)}} type="number" placeholder={"social/100"} className="name-field"  required='required'/>
              </div>
              <div className="name-outer2" style={{marginTop:"0.5rem"}}>
                <div className="name-label">
                    English{'\u00A0'}<i style={{color:"#EF4B4D",width:"10px",height:"10px"}} class="far fa-address-book"></i>
                </div>
                <input min="0" onChange={(e)=>{setEnglish(e.target.value)}} type="number" placeholder={"english/100"} className="name-field"  required='required'/>
              </div>
            </div>
            <div className='name-outer-outer'>
              <div className="name-outer2" style={{marginTop:"0.5rem"}}>
                <div className="name-label">
                    Chemistry{'\u00A0'}<i style={{color:"#EF4B4D",width:"10px",height:"10px"}} class="far fa-address-book"></i>
                </div>
                <input min="0" onChange={(e)=>{setChemistry(e.target.value)}} type="number" placeholder={"chemistry/100"} className="name-field"  required='required'/>
              </div>
              <div className="name-outer2" style={{marginTop:"0.5rem"}}>
                <div className="name-label">
                    Physics{'\u00A0'}<i style={{color:"#EF4B4D",width:"10px",height:"10px"}} class="far fa-address-book"></i>
                </div>
                <input min="0" onChange={(e)=>{setPhysics(e.target.value)}} type="number" placeholder={"physics/100"} className="name-field"  required='required'/>
              </div>
            </div>
            <div className='name-outer-outer'>
              <div className="name-outer2" style={{marginTop:"0.5rem"}}>
                <div className="name-label">
                    Maths{'\u00A0'}<i style={{color:"#EF4B4D",width:"10px",height:"10px"}} class="far fa-address-book"></i>
                </div>
                <input min="0" onChange={(e)=>{setMath(e.target.value)}} type="number" placeholder={"maths/100"} className="name-field"  required='required'/>
              </div>
            </div>
            <div className='name-outer-outer'>
              <div className='button' onClick={()=>{submit_clicked()}}>
                SUBMIT
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
