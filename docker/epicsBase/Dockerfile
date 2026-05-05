ARG BASE_IMAGE=ubuntu:24.04

FROM ${BASE_IMAGE} AS epicsbase

RUN apt-get update && apt-get install -y wget autoconf libtool check patch build-essential libreadline-dev re2c libxml2-dev tmux software-properties-common curl

# Download and run the latest UV installer
RUN curl -LsSf https://astral.sh/uv/install.sh | sh
RUN install -Dm755 /root/.local/bin/uv /usr/local/bin/uv
# Ensure the installed binary is on the `PATH`
ENV PATH="/usr/local/bin/uv:$PATH"
ENV UV_PYTHON_CACHE_DIR=/opt/uv-cache/uv/python

RUN --mount=type=cache,target=/opt/uv-cache/uv \
    uv python install 3.12.7

ENV EPICS_BASE=/epics/base/
WORKDIR /epics

RUN wget https://epics-controls.org/download/base/base-7.0.9.tar.gz
RUN tar -xvf base-7.0.9.tar.gz
RUN ln -s /epics/base-7.0.9 /epics/base
WORKDIR /epics/base
RUN make -j ${no_jobs-4}

WORKDIR /epics
