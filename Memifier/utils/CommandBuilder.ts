import { FFmpegKit, FFmpegSession } from "ffmpeg-kit-react-native";

export class CommandBuilder {
  /**
   * A builder class that provides methods to incrementally
   * build the arguments that will be passed to FFMPEG.
   * Finally building the object will return the execute session from FFMPEG
   */

  input: string;
  output: string;
  time_start: string;
  duration: string;
  width: string;
  fps: string;
  options: string;

  constructor() {
    this.input = "";
    this.output = "";
    this.time_start = "";
    this.width = "";
    this.fps = "";
    this.duration = "-t 10";
    this.options = "-loop 0 ";
  }

  setInput(input_path: string): CommandBuilder {
    this.input = "-i " + input_path + " ";
    return this;
  }
  setOutput(output_path: string): CommandBuilder {
    this.output = output_path + ".gif" + " ";
    return this;
  }

  setFps(fps: string): CommandBuilder {
    this.fps = fps;
    return this;
  }

  setStart(time_start: string): CommandBuilder {
    this.time_start = "-ss " + time_start + " ";
    return this;
  }

  setWidth(width: string): CommandBuilder {
    this.width = `-vf "fps=${this.fps},scale=${width}:-1:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse"`;
    return this;
  }

  setDuration(duration: string): CommandBuilder {
    this.duration = "-t " + duration + " ";
    return this;
  }

  build(): Promise<FFmpegSession> {
    let argumentList = [
      this.time_start,
      this.duration,
      this.input,
      this.options,
      this.output,
    ];

    return FFmpegKit.executeWithArgumentsAsync(argumentList);
  }
}
