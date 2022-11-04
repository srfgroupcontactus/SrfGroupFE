import * as React from 'react'
import SignatureCanvas from 'react-signature-canvas'
import Button from "@mui/material/Button";
import {ButtonGroup} from "@mui/material";

function SignatureRentRequest({callbackImageURL}: {callbackImageURL: any}) {

    const [writeSignature, setWriteSignature] = React.useState(false)
    const sigCanvas: any = React.useRef()
    const [penColor, setPenColor] = React.useState('black')
    const [imageURL, setImageURL] = React.useState('')

    const colors = ['black', 'green', 'red']

    React.useEffect(() => {
        clearSignature();
    }, [])

    const createSignature = () => {
        const URL = sigCanvas.current.getTrimmedCanvas().toDataURL('image/png');
        if( URL ){
            setImageURL(URL)
            callbackImageURL(URL);
        }
    }

    const clearSignature = () => {
        setWriteSignature(false);
        setImageURL('');
        sigCanvas.current.clear()
        callbackImageURL('');
    }

    const onEndSignature = () => {
        setWriteSignature(true);
    }

    return (
        <div className='app-signature'>

            <div className='sigPad__penColors'>
                <p>Pen Color:</p>
                {colors.map((color) => (
                    <span
                        key={color}
                        style={{
                            backgroundColor: color,
                            border: `${color===penColor ? `2px solid ${color}` : '' }`}}
                        onClick={() => setPenColor(color)}>
                            </span>
                ))}
            </div>
            <div className='sigPadContainer'>
                <SignatureCanvas penColor={penColor}
                                 canvasProps={{className: 'sigCanvas'}}
                                 ref={sigCanvas}
                                 onEnd={onEndSignature}/>
            </div>
            <div className='modal__bottom'>

                <ButtonGroup aria-label="outlined primary button group" sx={{mt:2}}>
                    <Button onClick={() => clearSignature()} color="neutral" disabled={writeSignature ? false : true}>
                        Clear
                    </Button>
                    <Button onClick={createSignature} color="success" disabled={writeSignature ? false : true}>
                        Confirmer
                    </Button>
                </ButtonGroup>
            </div>

            {imageURL &&
            <>
                <img
                    src={imageURL}
                    alt='signature'
                    className='signature'
                />
            </>
            }

        </div>
    )
}

export default SignatureRentRequest
