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
    <div className='w-full h-screen flex flex-col'>
      <div className="mx-auto flex gap-5 items-center">
        <h1 className='text-4xl text-sky-700  font-bold'>QR Snap</h1>
        <picture>
          <img className="max-w-50 h-auto" src="/qr-snap-logo.png" alt="Qr Snap logo" />
        </picture>
      </div>
      <div className="max-w-sm">
        <p>Generate. Scan. Share</p>
        <form className="flex flex-col" onSubmit={(e) =>{handleSubmit(e)}}>
          <input
          required
            type="text"
            placeholder="Enter text to generate QR"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="p-2 mb-4 rounded text-slate-800"
          />
          <button className="bg-slate-800 px-4 py-1 text-slate-100 rounded cursor-pointer">Download QR Code</button>
        </form>
        {text && 
          <div className="bg-white p-4 rounded w-sm"> 
            <QRCodeCanvas ref={qrRef} value={text} size={1024}
            bgColor="#ffffff" // Background color for padding
              fgColor="#000000" // Foreground color for the QR code
            />
          </div>
        }
      </div>
      
      
    </div>
  )
}

export default App
