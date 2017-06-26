/**
 * Created by Ali on 6/25/2017.
 */
export class UserModel{
  id: number;
  name: string;
  username: string;
  email: string;
  image: any;
  rank: number;
  accessLevel: string;

  static convertToObject(data: UserModel): any{
    return {
      uid: data.id,
      name: data.name,
      username: data.username,
      email: data.email,
      image: data.image,
      rank: data.rank,
      access_level: data.accessLevel
    };
  }

  static convertToModel(data: any): UserModel{
    let tempUserModel = new UserModel();

    tempUserModel.id = (data.uid === undefined) ? null : data.uid;
    tempUserModel.name = (data.name === undefined) ? null : data.name;
    tempUserModel.username = (data.username === undefined) ? null : data.username;
    tempUserModel.email = (data.email === undefined) ? null : data.email;
    tempUserModel.image = (data.image === undefined) ? null : data.image;
    tempUserModel.rank = (data.rank === undefined) ? null : data.rank;
    tempUserModel.accessLevel = (data.access_level === undefined) ? null : data.access_level;

    return tempUserModel;
  }
}