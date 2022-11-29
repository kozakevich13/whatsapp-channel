import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import { useTranslation } from "react-i18next";



function Home(data) {
    const { t } = useTranslation();
    const [picture, setPicture] = useState('https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png')
    const [access_token, setAccses_token] = useState('')
    const [wsData, setWsData] = useState('')
    const [whatsAppBusId, setWhatsAppBusId] = useState('')

    useEffect(() => {
      setPicture(data.data.picture.data.url)  
      setAccses_token(data.data.accessToken)
    },[]);

    async function fetchData() {
        const url = `https://graph.facebook.com/${whatsAppBusId}?access_token=${access_token}`;

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

    const disconnect = () => {
        sessionStorage.setItem('data', JSON.stringify(''));
        window.location.reload()
    }

  return (
    <>
        <h2 className="ms-3">{t("facebook")}</h2> 
        <p className="ms-3">{t("conect")}</p>
        <hr/>
        <p className="fw-bold ms-3">{t("edit")}</p>
        <div className="d-flex">
            <div className="w-75 p-3 ">
                <div className="border-bottom bg-light bg-gradient p-3">
                    {t("whatsapp_bus_id")}
                </div>
                <div>
                    <input 
                        value={whatsAppBusId} 
                        onChange={e => setWhatsAppBusId(e.target.value)} 
                        type="text" className="form-control" 
                        aria-label="Sizing example input" 
                        aria-describedby="inputGroup-sizing-default" 
                    />
                    <button className="btn btn-warning" onClick={()=>{fetchData()}}>Get data</button>
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
