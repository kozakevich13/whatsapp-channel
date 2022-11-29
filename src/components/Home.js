import { useState, useEffect, useCallback } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import { useTranslation } from "react-i18next";



function Home(data, load) {
    const { t } = useTranslation();
    const arrayPermission = [
        { name: "public_profile"},
        { name: "pages_show_list"},
      ];

    const [picture, setPicture] = useState('https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png')
    const [userId, setUserId] = useState(0)
    const [access_token, setAccses_token] = useState('')
    const [wsData, setWsData] = useState('')

    let whats_app_business_account_id = "100850302872958"

   
    useEffect(() => {
      setPicture(data.data.picture.data.url)  
      setUserId(data.data.id)
      setAccses_token(data.data.accessToken)
    },[]);

    async function fetchData() {
        const url = `https://graph.facebook.com/${userId}?access_token=${access_token}`;

        fetch(url, {
            method: "GET",
            withCredentials: true,
            headers: {
                "Content-Type": "application/json"
            }
            })
            .then(resp => resp.json())
            .then(function(data) {
                setWsData(data)
            })
            .catch(function(error) {
            });
    }
    useEffect(() => {
        fetchData()
    }, [access_token]);

    const disconnect = () => {
        sessionStorage.setItem('data', JSON.stringify(''));
        window.location.reload()
    }

    console.log(data)
    console.log(whats_app_business_account_id)


  return (
    <>
        <h2 className="ms-3">{t("facebook")}</h2> 
        <p className="ms-3">{t("conect")}</p>
        <hr/>
        <p className="fw-bold ms-3">{t("edit")}</p>
        <div className="d-flex">
            <div className="w-75 p-3 ">
                <div className="border-bottom bg-light bg-gradient p-3">
                    {t("conect_facebook")}
                </div>
                <div>
                    <input></input>
                </div>
                <div className="d-flex">
                 <p>name: </p>
                 <p>{wsData.name}</p>
                </div>
                <div className="d-flex">
                 <p>id:</p>
                 <p>{wsData.id}</p>
                </div>
            </div>
            <div className="col-md-4 m-2 h-5 border rounded">
                {picture ? <img className="img-thumbnail d-block me-auto ms-auto mt-5" alt="logo" src={picture} /> : null}
                <p className="text-center">{data.data.name}</p>
                <p className="text-center text-secondary">{t("connected_accounts")}</p>
                <Button className='m-2 d-block me-auto ms-auto' variant="outline-warning" onClick={disconnect}>{t("disconnect")}</Button>
            </div>
        
        </div>
        
    </>
  );
}

export default Home;
