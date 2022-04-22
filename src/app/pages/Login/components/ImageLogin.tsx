import { FC } from 'react'

import Image from 'assets/image/login/login.png'

export const ImageLogin: FC = () => {
  return (
    <div className="pic js-tilt">
      <img src={Image} alt="Image de alt" />
    </div>
  )
}
