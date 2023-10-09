import { Queue } from "@/models/Queue";
import { allQueue } from "@/assets/queue";
export const getQueue = (id: number) => {
  const res = allQueue[id];
  if (res) {
    return {
      id: id,
      name: res.name,
      shortName: res.shortName,
      description: res.description,
      detailedDescription: res.detailedDescription,
    } as Queue;
  }
};
