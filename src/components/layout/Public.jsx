import {Outlet} from 'react-router-dom';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Chat from '../layout/Chat';

export default function Public(){
    return(
        <>
            <Header/>
            <Outlet/>
            <Chat/>
            <Footer/>
        </>
    )
}