import { Link } from "react-router-dom";
import Navbar from "../src/Navbar";
import './result.css';

export default function Result () {
    return (
    <>
    <Navbar />
    
    <div className="row">
        <div className="column1">
            <img id="render" src="../img/render.png" alt="3D guy" />
        </div>
        <div className="column2">
            {/* when you hit submit this data should go somewhere */}
            <form>
                <input className="text-input" type="text" value="What's your alter ego's name?" />
                <div id="songs">
                    <div>
                        <p>All Too Well by Taylor Swift</p>
                        <hr class="solid" />
                    </div>
                    
                    <div>
                        <p>Sunflower Seeds by Bryce Vine</p>
                        <hr class="solid" />
                    </div>
                    
                    <div>
                        <p>Easy On Me by Adele</p>
                        <hr class="solid" />
                    </div>

                    <div>
                        <p>Notice Me by Quinn XCII</p>
                        <hr class="solid" />
                    </div>

                    <div>
                        <p>THATS WHAT I WANT by Lil Nas X</p>
                        <hr class="solid" />
                    </div>

                    <div>
                        <p>Unstoppable by Sia</p>
                        <hr class="solid" />
                    </div>

                </div>
                <input type="submit" className="normal-button" value="SAVE PLAYLIST" />
            </form> 
        </div>
    </div>
    </>
    )
}