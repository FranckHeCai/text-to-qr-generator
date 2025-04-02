import { useState, useRef } from "react"
import { QRCodeCanvas } from "qrcode.react"
import "./styles.css"

function App() {
  const [text, setText] = useState<string>("")
  const qrRef = useRef<HTMLCanvasElement>(null);
  function handleSubmit(event : React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setText("")
    handleDownload()
  }

  const handleDownload = () => {
    if (qrRef.current) {
      const canvas = qrRef.current;
      const url = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = url;
      link.download = `${text}-code.png`;
      link.click();
    }
  };

  return (
    <div className='w-full flex flex-col items-center p-5 gap-0 sm:gap-2'>
      <div className="mx-auto flex sm:gap-5 items-center justify-center flex-wrap">
        <picture>
          <img className="max-w-30 h-auto" src="/qr-snap-logo.png" alt="Qr Snap logo" />
        </picture>
        <h1 className='text-4xl text-sky-700  font-bold'>QR Snap</h1>
      </div>
      <div className="w-full sm:w-md flex flex-col items-center sm:gap-4">
        <p className="text-md font-medium italic">Generate. Scan. Share.</p>
        <form className="flex flex-col w-full" onSubmit={(e) =>{handleSubmit(e)}}>
          <input
          required
            type="text"
            placeholder="Enter text to generate QR"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="p-2 mb-4 rounded text-sky-950 border-2 border-sky-600"
          />
         
        {text && (
          <>
            <div className="mx-auto"> 
              <QRCodeCanvas ref={qrRef} value={text} size={256}
              bgColor="#ffffff" // Background color for padding
                fgColor="#000000" // Foreground color for the QR code
              />
            </div>
            <button className="mt-4 bg-sky-700 px-4 py-1 w-full text-slate-100 rounded cursor-pointer">
              Download QR Code
            </button>
          </>
          
        )
          
        }
         
        </form>
      </div>
      
      
    </div>
  )
}

export default App
