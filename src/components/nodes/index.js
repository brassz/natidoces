import TextNode from './TextNode'
import AudioNode from './AudioNode'
import ImageNode from './ImageNode'
import ButtonsNode from './ButtonsNode'
import RedirectNode from './RedirectNode'
import DelayNode from './DelayNode'
import ConditionNode from './ConditionNode'
import StartNode from './StartNode'
import TestNode from './TestNode'

export {
  TextNode,
  AudioNode,
  ImageNode,
  ButtonsNode,
  RedirectNode,
  DelayNode,
  ConditionNode,
  StartNode,
  TestNode
}

export const nodeTypes = {
  text: TextNode,
  audio: AudioNode,
  image: ImageNode,
  buttons: ButtonsNode,
  redirect: RedirectNode,
  delay: DelayNode,
  condition: ConditionNode,
  start: StartNode,
  test: TestNode
}