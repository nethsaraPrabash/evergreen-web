import Navbar from '../components/Navbar'
import '../styles/Home.css'
import { ExcelSheet } from './Excelsheet'

const Home = () => {
  return (

    <>
    <div className="navhold">
      <Navbar />
    </div>
    <div className="spreadsheet">
      <ExcelSheet />
    </div>

    </>
  )
}

export default Home