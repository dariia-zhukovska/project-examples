import React, { MutableRefObject, ReactNode } from "react";
import CommonFileInput from "../common-input/file-input/CommonFileInput";

import styles from "./styles.module.scss";
import Button from "../common-button/Button";
import clsx from "clsx";

type AddAvatarProps = {
  placeholder: any;
  onClick: (e: any) => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  avatarPreview: string | ReactNode;
  avatarSizeError: string;
  inputRef: MutableRefObject<HTMLInputElement | null>;
  genInfo?: boolean;
  formPreview?: boolean;
};

const AddPictureComponent: React.FC<AddAvatarProps> = ({
  placeholder,
  onClick,
  onChange,
  avatarPreview,
  avatarSizeError,
  inputRef,
  genInfo,
  formPreview,
}) => {
  return (
    <div>
      <div className={styles.avatarBlockWrapper}>
        <div
          className={clsx(styles.avatar, {
            [styles["avatar--genInfo"]]: genInfo,
            [styles["avatar--formPreview"]]: formPreview,
          })}
        >
          {avatarPreview}
        </div>
        <div className={styles.addPicture}>
          <div className={styles.avatarInputWrapper}>
            <Button
              size="S"
              variant="link"
              state="default"
              placeholder={placeholder}
              onClick={onClick}
            />
            <CommonFileInput
              name="avatar"
              type="file"
              inputRefProp={inputRef}
              accept=".jpg, .jpeg, .png"
              onChange={onChange}
            />
          </div>
          <p className={styles.avatarReqs}>jpg. jpeg. png. (max 5mb)</p>
        </div>
      </div>
      {<p className={styles.avatarError}>{avatarSizeError}</p>}
    </div>
  );
};

export default AddPictureComponent;
