<template>
  <div style="height: 100px;">
    <twemoji-textarea ref="twemoji" :emojiData="emojiDataAll" :emojiGroups="emojiGroups" @enterKey="onEnterKey"
      :textareaDisabled="!true" :emojiPickerDisabled="!true" :enableSendBtn="true"
      :placeholder="'请输入评论，按Enter或者左边纸飞机发送'" @contentChanged="contentChanged">
    </twemoji-textarea>
  </div>
</template>

<script>
import axios from '../util/myaxios';

import {
  TwemojiTextarea
} from '@kevinfaguiar/vue-twemoji-picker';
import EmojiAllData from '@kevinfaguiar/vue-twemoji-picker/emoji-data/zh/emoji-all-groups.json';
import EmojiGroups from '@kevinfaguiar/vue-twemoji-picker/emoji-data/emoji-groups.json';
export default {
  name: 'App',
  props: {
    blogId: '',
    init: {
      type: Function,
      default: null,
    }
  },
  data() {
    var msg = '';
    return {
      content: '',
      msg,
    }
  },
  components: {
    'twemoji-textarea': TwemojiTextarea
  },
  computed: {
    emojiDataAll() {
      return EmojiAllData;
    },
    emojiGroups() {
      return EmojiGroups;
    }
  },
  methods: {
    onEnterKey(e) {
      axios.post('/comment', {
        userId: JSON.parse(localStorage.getItem("userInfo")).data.id,
        blogId: this.blogId,
        content: this.content
      }).then(res => {
        this.clear()
        this.$emit('init', null);
      })
      console.log('init');
    },
    contentChanged(val) {
      console.log(val)
      console.log(this.blogId);
      this.content = val;
    },
    clear() {
      this.$refs.twemoji.cleanText()
    },
  }
}
</script>


<style scoped>

</style>
