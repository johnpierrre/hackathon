import { FFmpegKit, FFmpegSession } from "ffmpeg-kit-react-native";

export class CommandBuilder {
  /**
   * A builder class that provides methods to incrementally
   * build the arguments that will be passed to FFMPEG.
   * Each builder method returns the builder itself so we can chain the methods.
   * Finally building the object will return the execute session promise from FFMPEG
   */

  // The reason we are storing the arguments in individual strings instead of a single string to where we
  // concatenate the arguments is because this way we can know for sure that no single argument is repeated
  // i.e. we cannot add two input files, or two output files.
  // This way, we do not have to worry so much in the rest of the codebase about that issue,
  // and we know for sure  that only the last call per argument is used
  // (So for example, if we setInput twice, only the last call will be stored)
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
    // TODO: I do not know what happens if we call this with fps not set,
    // nor do I know if we can set the scale without setting the FPS.
    // I just assume that it will use the original FPS in case it is not overriden
    this.width = this.fps
      ? `-vf "fps=${this.fps},scale=${width}:-1:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse"`
      : `-vf "scale=${width}:-1:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse"`;
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

    // From what I know, executeWithArguments receives a string[], where each string is a single argument.
    // It will then return a Promise of an FFMPEG session, which is what will actually be running FFMPEG.
    // It is the session that the rest of the program will use to see if the execution was successful or not
    // Therefore, we can just directly return the Promise
    return FFmpegKit.executeWithArgumentsAsync(argumentList);
  }
}
