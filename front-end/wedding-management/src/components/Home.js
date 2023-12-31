import React, { useEffect, useState } from 'react';
import '../css/home.css';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    // const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const getUser = async (username) => {
        if (username != null) {
            navigate('/contract')
        } else {
            // setUser(username);
            return
        }
    }

    const goHome = () => {
        setTimeout(() => {
            navigate("/login")
        }, 7000)
    }

    useEffect(() => {
        document.title = 'Trang chủ'
    },[])

    useEffect(() => {
        const username = localStorage.getItem("username");
        getUser(username)
        goHome()
    }, [])
    return (
        <div className='home-page'>
            <div className="page-header d-flex align-items-start min-vh-100 justify-content-center align-items-center" style={{
                backgroundImage: 'url("https://bookvexe.vn/wp-content/uploads/2023/04/suu-tam-25-hinh-anh-nen-dam-cuoi-dep-lung-linh_1.jpg")',
                backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'
            }}>
               
            </div>
            <div className="criterion">
                <div className="text text0">W</div>
                <div className="text text1">e</div>
                <div className="text text2">l</div>
                <div className="text text3">c</div>
                <div className="text text4">o</div>
                <div className="text text5">m</div>
                <div className="text text6">e</div>
                <div className="text text7">: )</div>
                <div className="frame frame0" />
                <div className="frame frame1" />
                <div className="frame frame2" />
                <div className="frame frame3" />
                <div className="frame frame4" />
                <div className="frame frame5" />
                <div className="frame frame6" />
                <div className="frame frame7" />
                <div className="particle particle00" />
                <div className="particle particle01" />
                <div className="particle particle02" />
                <div className="particle particle03" />
                <div className="particle particle04" />
                <div className="particle particle05" />
                <div className="particle particle06" />
                <div className="particle particle07" />
                <div className="particle particle08" />
                <div className="particle particle09" />
                <div className="particle particle010" />
                <div className="particle particle011" />
                <div className="particle particle10" />
                <div className="particle particle11" />
                <div className="particle particle12" />
                <div className="particle particle13" />
                <div className="particle particle14" />
                <div className="particle particle15" />
                <div className="particle particle16" />
                <div className="particle particle17" />
                <div className="particle particle18" />
                <div className="particle particle19" />
                <div className="particle particle110" />
                <div className="particle particle111" />
                <div className="particle particle20" />
                <div className="particle particle21" />
                <div className="particle particle22" />
                <div className="particle particle23" />
                <div className="particle particle24" />
                <div className="particle particle25" />
                <div className="particle particle26" />
                <div className="particle particle27" />
                <div className="particle particle28" />
                <div className="particle particle29" />
                <div className="particle particle210" />
                <div className="particle particle211" />
                <div className="particle particle30" />
                <div className="particle particle31" />
                <div className="particle particle32" />
                <div className="particle particle33" />
                <div className="particle particle34" />
                <div className="particle particle35" />
                <div className="particle particle36" />
                <div className="particle particle37" />
                <div className="particle particle38" />
                <div className="particle particle39" />
                <div className="particle particle310" />
                <div className="particle particle311" />
                <div className="particle particle40" />
                <div className="particle particle41" />
                <div className="particle particle42" />
                <div className="particle particle43" />
                <div className="particle particle44" />
                <div className="particle particle45" />
                <div className="particle particle46" />
                <div className="particle particle47" />
                <div className="particle particle48" />
                <div className="particle particle49" />
                <div className="particle particle410" />
                <div className="particle particle411" />
                <div className="particle particle50" />
                <div className="particle particle51" />
                <div className="particle particle52" />
                <div className="particle particle53" />
                <div className="particle particle54" />
                <div className="particle particle55" />
                <div className="particle particle56" />
                <div className="particle particle57" />
                <div className="particle particle58" />
                <div className="particle particle59" />
                <div className="particle particle510" />
                <div className="particle particle511" />
                <div className="particle particle60" />
                <div className="particle particle61" />
                <div className="particle particle62" />
                <div className="particle particle63" />
                <div className="particle particle64" />
                <div className="particle particle65" />
                <div className="particle particle66" />
                <div className="particle particle67" />
                <div className="particle particle68" />
                <div className="particle particle69" />
                <div className="particle particle610" />
                <div className="particle particle611" />
                <div className="particle particle70" />
                <div className="particle particle71" />
                <div className="particle particle72" />
                <div className="particle particle73" />
                <div className="particle particle74" />
                <div className="particle particle75" />
                <div className="particle particle76" />
                <div className="particle particle77" />
                <div className="particle particle78" />
                <div className="particle particle79" />
                <div className="particle particle710" />
                <div className="particle particle711" />
            </div>
        </div>
    )
}