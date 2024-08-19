import { Map } from "../ui/map"
export default async function AboutPage() {

return(
    <div className="flex flex-col justify-center items-center">
        <h1 className="flex flex-row justify-center items-center bg-pink-600 rounded-full py-2 px-5 mx-5 mt-5 mb-10 text-white font-bold w-2/6">About</h1>
        <div className="grid grid-cols-2 gap-4 w-4/6">
            <div className="pr-7">
                <h2 className="font-bold text-lg text-pink-600 mb-5">M*t*mic</h2>
                <p className="text-justify">
                    We're a company that gets motorcycles into the hands of riders all over Spain. 
                    <br/>Our app has a to-do list to help you keep track of all your riding gear and notes. 
                    <br/>M*t*mic is always rooting for riders!
                    <br/>
                    <br/>
                    Call us anytime:{" "}
                    <a href="tel:+34910123456" className="text-pink-600 underline">
                    +34 910 123 456
                    </a>
                </p>
            </div>
            <div>
                <Map/>
            </div>
        </div>
    </div>
)
}