export interface Pose {
  pose_id: number;
  name: string;
  sanskrit_name: string;
  image_url: string;
  description: string;
  translation_name: string;
  pose_benefits: string;
}

export interface RoutineAttributes {
  name: string;
  description: string;
  difficulty: string;
  routine_poses: Pose[];
}

export interface RoutineItem {
  id: string;
  type: string;
  attributes: RoutineAttributes;
}

export interface RoutineResponse {
  data: RoutineItem[];
}

export interface RoutineDetails {
  data: RoutineItem;
}