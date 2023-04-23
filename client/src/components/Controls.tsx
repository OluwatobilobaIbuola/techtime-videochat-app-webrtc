import { camera, mic, phone } from "../assets/icons";
import useControlHook from "../Hooks/useControlHook";

export default function Controls() {
  const { cameraRef, micRef, toggleCamera, toggleMic, leaveCall } =
    useControlHook();
  return (
    <div className="absolute bottom-[20px] left-[50%] -translate-x-[50%] flex gap-4">
      <div
        ref={cameraRef}
        className="camera-btn bg-primary p-[20px] rounded-[50%] flex justify-center items-center cursor-pointer"
        onClick={toggleCamera}
      >
        <img
          alt="camera"
          src={camera}
          className="w-[20px] h-[20px] ss:w-[30px] ss:h-[30px]"
        />
      </div>

      <div
        ref={micRef}
        className="mic-btn bg-primary p-[20px] rounded-[50%] flex justify-center items-center cursor-pointer"
        onClick={toggleMic}
      >
        <img
          alt="mic"
          src={mic}
          className="w-[20px] h-[20px] ss:w-[30px] ss:h-[30px]"
        />
      </div>
      <div
        className="bg-red-400 p-[20px] rounded-[50%] flex justify-center items-center cursor-pointer"
        id="leave-btn"
        onClick={leaveCall}
      >
        <img
          alt="phone"
          src={phone}
          className="w-[20px] h-[20px] ss:w-[30px] ss:h-[30px]"
        />
      </div>
    </div>
  );
}
