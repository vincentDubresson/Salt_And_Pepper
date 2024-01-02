export default class PictureService {
  private static parsePictureDirectory = (pictureName: string) => {
    return `/${pictureName.substring(0, 2).toLowerCase()}/`;
  };

  static getPictureUrl(pictureName: string) {
    return `${this.parsePictureDirectory(pictureName)}${pictureName}`;
  }
}
