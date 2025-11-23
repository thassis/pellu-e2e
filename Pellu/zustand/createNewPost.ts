import { StateCreator } from 'zustand';

export interface NewPostSlice {
  descriptionNewPost: string | undefined;
  picturesNewPost: string[] | undefined;
  youtubeVideoIdNewPost: string | undefined;
  pollQuestionsNewPost: string[] | undefined;
  setDescriptionNewPost: (args: string) => void;
  setPicturesNewPost: (args: string[]) => void;
  setPollQuestionsNewPost: (args: string[]) => void;
  setYoutubeVideoIdNewPost: (args: string) => void;
  cleanNewPost: () => void;
}

export const createNewPostSlice: StateCreator<NewPostSlice> = set => ({
  descriptionNewPost: undefined,
  picturesNewPost: undefined,
  pollQuestionsNewPost: undefined,
  youtubeVideoIdNewPost: undefined,
  setDescriptionNewPost: (args: string) =>
    set(() => ({ descriptionNewPost: args })),
  setPicturesNewPost: (args: string[]) => set(() => ({ picturesNewPost: args })),
  setPollQuestionsNewPost: (args: string[]) =>
    set(() => ({ pollQuestionsNewPost: args })),
  setYoutubeVideoIdNewPost: (args: string) => set(() => ({ youtubeVideoIdNewPost: args })),
  cleanNewPost: () =>
    set(() => ({ descriptionNewPost: undefined, picturesNewPost: undefined, youtubeVideoIdNewPost: undefined, pollQuestionsNewPost: undefined })),
});
