import { Cell } from '../grid/Cell'
import { BaseModal } from './BaseModal'
import { CONFIG } from '../../constants/config'

type Props = {
  isOpen: boolean
  handleClose: () => void
}

export const InfoModal = ({ isOpen, handleClose }: Props) => {
  return (
    <BaseModal title="遊びかた" isOpen={isOpen} handleClose={handleClose}>
      <p className="text-sm text-gray-500">
        {CONFIG.tries}
        回以内に48Gメンバーの名前を当ててください。回答するたびに、あなたがどれだけ正解に近づいたかがタイルの色で示されます。
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell value="あ" status="correct" />
        <Cell value="ら" />
        <Cell value="い" />
        <Cell value="ゆ" />
        <Cell value="き" />
      </div>
      <p className="text-sm text-gray-500">
        「あ」は正解のメンバー名に含まれ、かつ、正しい位置（ここ例では１番目）にあることを示しています。
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell value="い" />
        <Cell value="そ" />
        <Cell value="か" status="present" />
        <Cell value="な" />
        <Cell value="え" />
      </div>
      <p className="text-sm text-gray-500">
        「か」は正解に含まれますが、位置は違います。
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell value="く" />
        <Cell value="ぼ" />
        <Cell value="さ" />
        <Cell value="と" status="absent" />
        <Cell value="ね" />
      </div>
      <p className="text-sm text-gray-500">「と」は正解に含まれていません。</p>

      <p className="mt-3 text-sm text-gray-500">
        <hr />
        <p className="font-bold text-lg">攻略のポイント</p>
        <ul className="text-left">
          <li>・卒業メンバーも対象です</li>
          <li>・同じ文字は２回以上出てきません</li>
          <li>
            ・最初からグレーになっている文字は答えに含まれません（ヒント用）
          </li>
          <li>・グループ限定で遊ぶこともできます（画面下ボタンより）</li>
        </ul>
      </p>
    </BaseModal>
  )
}
