import Image from "next/image";
import { Main_body } from "./Components/main_body";
import {Header2} from "@/app/Components/header2";
import MainComponent from "@/app/Components/mainComponent";

export default function Home() {
  return (
   <>


   <Main_body/>
       <div className={'ml-40'}><MainComponent/></div>

   </>
  );
}
