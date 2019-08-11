import fs from "fs";
import path from "path";

exports.upload = async ctx => {
  console.log(`upload.ctrl ctx.request : ${JSON.stringify(ctx.request)}`);
  const file = ctx.request.files.file;
  if (!file) {
    ctx.status = 400;
    ctx.body = {
      name: "FILE_NOT_GIVEN"
    };
    return;
  }
  console.log(`file : ${JSON.stringify(file)}`);
  const reader = fs.createReadStream(file.path);
  const splitFileName = file.name.split(".");
  const fileName = splitFileName[0]; //파일이름
  const fileExtension = splitFileName[1]; //확장자
  const mixedFileName = fileName.concat(
    (Math.random() * 10).toString(),
    ".",
    fileExtension
  );
  console.log(mixedFileName.toString());
  const fileNamePath = path.join(
    "/Users/David/ReactProject/react-myweb/front/public/tempfile",
    mixedFileName
  ); //사진 경로를 front 서버에 /public으로
  const stream = fs.createWriteStream(fileNamePath);
  reader.pipe(stream);
  console.log("uploading %s -> %s", file.name, stream.path);

  ctx.body = { imgName: mixedFileName };
};
