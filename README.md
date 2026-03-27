



## Setup



### 1. Clone repo

```bash

git clone https://github.com/Dheeraj-Chintala/Automated-Image-Synthesis-Using-Generative-AI.git

cd Automated-Image-Synthesis-Using-Generative-AI

```



### 2. Add Hugging Face token in `.env`



Create a token at [Hugging Face settings](https://huggingface.co/settings/tokens), then add:



```

VITE_HF_TOKEN=your_hf_token_here

```



Image generation uses the [Hugging Face Inference](https://huggingface.co/docs/huggingface.js/inference/README) client: `InferenceClient` with `textToImage`, provider **nscale**, model **black-forest-labs/FLUX.1-schnell**, and `num_inference_steps: 5`.



### 3. Install Dependencies

```bash

npm install

```





### 4. Run Development Server

```bash

npm run dev

```



The app will run at:



http://localhost:5173



