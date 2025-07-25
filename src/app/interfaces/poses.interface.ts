export interface Pose {
  data: {
    id: number;
    type: string;
    attributes: {
      name: string;
      sanskrit_name: string;
      image_url: string
    }
  }
}

export interface PoseDetails {
  data: {
    id: number;
    type: string;
    attributes: {
      name: string;
      sanskrit_name: string;
      pose_description: string;
      pose_benefits: string;
      translation_name: string;
      image_url: string
    }
  }
}