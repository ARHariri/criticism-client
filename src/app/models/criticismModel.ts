/**
 * Created by Ali on 3/31/2017.
 */
export class CriticismModel{
  id: number;
  subject: string;
  subject_id: number;
  tags: string[];
  writerName: string;
  writerImage: any;
  content: string;
  responsibleName: string;
  responsibleId: number;
  vote: number;

  constructor(){}

  static convertToObject(data: CriticismModel){
    let res = {
      subject: data.subject,
      subject_id: data.subject_id,
      rank: (data.vote) ? data.vote : 0,
      c_content: data.content,
      part: data.responsibleId,
      tags: data.tags
    };

    return res;
  }
}
