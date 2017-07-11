/**
 * Created by Ali on 4/3/2017.
 */
export class ReplyModel{
  id: number;
  criticism_id: number;
  criticism_subject: string;
  criticism_content: string;
  criticism_date: Date;
  criticism_tags: string[];
  criticism_is_backward: boolean;
  criticism_is_reject: boolean;
  criticism_part: string;
  criticism_rank: number;
  replier_part: string;
  replier_name: string;
  replier_rank: number;
  content: string;
  rank: number;
  thank_number: number;
}
